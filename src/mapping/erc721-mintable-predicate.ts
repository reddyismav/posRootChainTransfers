// import {Withdrawal} from '../../generated/schema'

// import { ExitTokensCall } from '../../generated/MintableERC721Predicate/MintableERC721Predicate'


// export function handleNewMintableERC721PredicateTransfer(call: ExitTokensCall): void {
//     let id = call.transaction.hash.toHex()
//     let transaction = new Withdrawal(id)
//     transaction.log = call.inputs.log
//     transaction.rootToken = call.inputs.rootToken
//     transaction.predicateType= "erc721-mintable"
  
//     transaction.timestamp = call.block.timestamp
//     transaction.transactionHash = call.transaction.hash
//     transaction.save()
  
// }

