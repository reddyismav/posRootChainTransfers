

// import {Withdrawal} from '../../generated/schema'

// import { ExitTokensCall } from '../../generated/EtherPredicate/EtherPredicate'

// export function handleNewEtherPredicateTransfer(call: ExitTokensCall): void {
//     let id = call.transaction.hash.toHex()
//     let transaction = new Withdrawal(id)
//     transaction.log = call.inputs.log
//     //transaction.rootToken = Buffer.from('0x0000000000000000000000000000000000000000000000000000000000000000', 'hex');
//     transaction.predicateType= "erc721"
  
//     transaction.timestamp = call.block.timestamp
//     transaction.transactionHash = call.transaction.hash
//     transaction.save()
  
// }

