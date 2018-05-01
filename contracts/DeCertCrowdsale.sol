pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/crowdsale/emission/AllowanceCrowdsale.sol";
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract DeCertCrowdsale is AllowanceCrowdsale {
    function DeCertCrowdsale(
        uint256 _rate,
        address _wallet,
        MintableToken _token,
        address _allowanceAddress
    )
        public
        Crowdsale(_rate, _wallet, _token)
        AllowanceCrowdsale(_allowanceAddress) {
    }
}