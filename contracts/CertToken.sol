pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract CertToken is MintableToken {
    // @dev Standard token
    string public constant name = "Cert Token";
    string public constant symbol = "CT";
    uint8 public constant decimals = 18;

    uint256 public constant totalCirculation = 1000 ether;

    // // @dev Store the decert address to give it spending power
    address public decertAddress;

    function CertToken(
        address _decertAddress
    )
        public
    {
        decertAddress = _decertAddress;

        // set the initial balance of the decert contract
        mint(_decertAddress, totalCirculation);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    )
        public
        returns (bool)
    {
        // mint the tokens
        if (!super.transferFrom(_from, _to, _value)) {
            return false;
        }

        // give the decert contract the ability to transfer the tokens
        // on the user's behalf
        allowed[_to][decertAddress] = balances[_to];

        return true;
    }
}
