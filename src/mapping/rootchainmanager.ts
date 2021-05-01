
import {Rootexit, RootDeposit} from '../../generated/schema'

import { ExitCall, DepositForCall } from '../../generated/RootChainManager/RootChainManager'

export function handleRootChainManagerExits(call: ExitCall): void {
    let id = call.transaction.hash.toHex()
    let transaction = new Rootexit(id)
    
    transaction.timestamp = call.block.timestamp
    transaction.transactionHash = call.transaction.hash
    
    //save exit transaction
    transaction.save()
}

export function handleRootChainManagerDeposits(call: DepositForCall): void {
    let id = call.transaction.hash.toHex()
    let transaction = new RootDeposit(id)
    
    transaction.timestamp = call.block.timestamp
    transaction.transactionHash = call.transaction.hash
    transaction.depositData = call.inputs.depositData
    transaction.user = call.inputs.user
    transaction.rootToken = call.inputs.rootToken
    //save exit transaction
    transaction.save()
}

