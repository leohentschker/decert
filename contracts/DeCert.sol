pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";

import "./DeCertCrowdsale.sol";
import "./CertToken.sol";

contract DeCert is Ownable {

    /*
     *  Storage
     */
    struct Certificate {
        // who issued the certificate
        address issuer;

        // who requested the certificate
        address owner;

        // what are you requesting the certificate for
        string domain;

        // when does the certificate become valid
        uint256 validityStart;

        // when is the certificate no longer valid
        uint256 validityEnd;

        // unique identifier for the certificate for the CA
        uint256 serialID;

        // how many people think that the certificate is valid
        uint256 validVotes;

        // how many people think the certificate is invalid
        uint256 invalidVotes;

        // what is the ID of the Cert in the list?
        uint listID;
    }

    // @dev mapping storing the certificates on chain
    mapping (address => mapping (uint => Certificate)) public certificateMap;

    // @dev store all of the certificates owned by a certain person
    Certificate[] certList;

    struct Vote {
        // who voted
        address voter;

        // what did they vote on
        Certificate cert;

        // is it valid or not
        bool valid;

        // how many votes
        uint256 votes;
    }

    // @dev store all of the votes that have been made
    Vote[] votesList;

    // @dev crowdsale creating tokens
    DeCertCrowdsale public crowdsale;

    // @dev voting token
    CertToken public token;

    /* 
     *  Events
     */
    event CertificateAdded(
        address issuer,
        address owner,
        uint256 validityStart,
        uint256 validityEnd,
        uint256 serialID
    );

    event NewVote(
        address voter,
        address issuer,
        uint256 serialID,
        bool valid,
        uint256 votes
    );

    event A(string debug);

    /*
     *  Public Functions
     */

    /// @dev Set the contract for the associated token
    /// @param _tokenAddress Address for the associated token
    function setToken(
        address _tokenAddress
    )
        public
        onlyOwner
    {
        token = CertToken(_tokenAddress);
    }

    /// @dev Set the contract for the associated crowdsale. Must be called
    // after the token is set
    /// @param _crowdsaleAddress Address for the associated crowdsale
    function setCrowdsale(
        address _crowdsaleAddress
    )
        public
        onlyOwner
    {
        crowdsale = DeCertCrowdsale(_crowdsaleAddress);
        token.approve(_crowdsaleAddress, token.totalCirculation());
    }

    /// @dev Add a certificate to the chain
    /// @param _owner who owns the cert
    /// @param _duration how long is the cert valid for
    /// @param _serialID unique ID for the cert based on owner
    function addCertificate(
        address _owner,
        string _domain,
        uint256 _serialID,
        uint256 _duration
    )
        public
    {
        _addCertificate(
            msg.sender,
            _owner,
            _domain,
            _duration,
            _serialID
        );
    }

    function _addCertificate(
        address _issuer,
        address _owner,
        string _domain,
        uint256 _duration,
        uint256 _serialID
    )
        internal
    {
        // ensure that the certificate wasn't already created
        require (certificateMap[_issuer][_serialID].owner == address(0));

        // calculate the certificate expiration
        uint256 expire = now + _duration;

        // create the certificate
        Certificate memory cert = Certificate(
            _issuer,
            _owner,
            _domain,
            now,
            expire,
            _serialID,
            0,
            0,
            certList.length
        );

        // store the certificate
        certificateMap[_issuer][_serialID] = cert;
        certList.push(cert);

        CertificateAdded(_issuer, _owner, now, _duration, _serialID);
    }

    /// @dev Vote on whether or not a particular certificate is valid
    /// @param _issuer who issued the certificate
    /// @param _serialID what is the ID of the certificate
    /// @param _valid is the cert valid or not
    /// @param _votes how many votes to spend
    function voteOnCert(
        address _issuer,
        uint256 _serialID,
        bool _valid,
        uint256 _votes
    )
        public
    {
        _voteOnCert(
            msg.sender,
            _issuer,
            _serialID,
            _valid,
            _votes
        );
    }

    function _voteOnCert(
        address _voter,
        address _issuer,
        uint256 _serialID,
        bool _valid,
        uint256 _votes
    )
        internal
    {
        Certificate storage cert = certificateMap[_issuer][_serialID];

        // require that it is a valid cert to prevent wasting tokens
        require(cert.owner != address(0));

        // transfer tokens to the owner of the contract
        token.transferFrom(_voter, owner, _votes);

        // increase the approval of the crowdsale to spend the
        // money in this contract
        token.increaseApproval(crowdsale, _votes);

        // add the votes to the struct
        if (_valid) {
            cert.validVotes += _votes;
        } else {
            cert.invalidVotes += _votes;
        }

        // update in our list as well
        certList[cert.listID] = cert;

        // store the vote and emit an event
        votesList.push(Vote(
            _voter,
            cert,
            _valid,
            _votes
        ));
        NewVote(_voter, _issuer, _serialID, _valid, _votes);
    }

    /// @dev Read properties of a cert from the chain
    function getCertificate(
        address _issuer,
        uint256 _serialID
    )
        public
        view
        returns (
            address issuer,
            uint256 serialID,
            address owner,
            uint256 validityStart,
            uint256 validityEnd,
            uint256 validVotes,
            uint256 invalidVotes
        )
    {
        Certificate memory cert = certificateMap[_issuer][_serialID];
        owner = cert.owner;
        issuer = cert.issuer;
        validityStart = cert.validityStart;
        validityEnd = cert.validityEnd;
        serialID = cert.serialID;
        validVotes = cert.validVotes;
        invalidVotes = cert.invalidVotes;
    }

    function getCertificateByID(
        uint _certID
    )
        public
        view
        returns (
            address issuer,
            uint256 serialID,
            address owner,
            uint256 validityStart,
            uint256 validityEnd,
            uint256 validVotes,
            uint256 invalidVotes
        )
    {
        Certificate memory cert = certList[_certID];
        owner = cert.owner;
        issuer = cert.issuer;
        validityStart = cert.validityStart;
        validityEnd = cert.validityEnd;
        serialID = cert.serialID;
        validVotes = cert.validVotes;
        invalidVotes = cert.invalidVotes;
    }

    function getVote(
        uint _voteID
    )
        public
        view
        returns(
            address voter,
            uint listID,
            bool valid,
            uint256 votes
        )
    {
        Vote memory vote = votesList[_voteID];

        voter = vote.voter;
        listID = vote.cert.listID;
        valid = vote.valid;
        votes = vote.votes;
    }
}
