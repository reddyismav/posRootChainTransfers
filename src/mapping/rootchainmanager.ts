
import { Rootexit, RootDeposit, GlobalRootExitCounter, GlobalRootDepositCounter, RootDepositEther, GlobalRootDepositEtherCounter } from '../../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'
import { ExitCall, DepositForCall, DepositEtherForCall } from '../../generated/RootChainManager/RootChainManager'

export function handleRootChainManagerExits(call: ExitCall): void {
    let id = call.transaction.hash.toHex()

    let counter = getGlobalRootExitCounter()
    let updated = counter.current.plus(BigInt.fromI32(1))
    counter.current = updated
    counter.save()
    let transaction = new Rootexit(id)
    
    transaction.timestamp = call.block.timestamp
    transaction.transactionHash = call.transaction.hash
    transaction.counter = updated
    
    //save exit transaction
    transaction.save()
}

export function handleRootChainManagerDeposits(call: DepositForCall): void {
    let id = call.transaction.hash.toHex()
    let counter = getGlobalRootDepositCounter()
    let updated = counter.current.plus(BigInt.fromI32(1))
    counter.current = updated
    counter.save()

    let transaction = new RootDeposit(id)
    
    transaction.timestamp = call.block.timestamp
    transaction.transactionHash = call.transaction.hash
    transaction.depositData = call.inputs.depositData
    transaction.user = call.inputs.user
    transaction.rootToken = call.inputs.rootToken
    transaction.counter = updated
    //save exit transaction
    transaction.save()
}

function getGlobalRootDepositCounter(): GlobalRootDepositCounter {
    // Only one entry will be kept in this entity
    let id = 'global-root-deposit-counter'
    let entity = GlobalRootDepositCounter.load(id)
    if (entity == null) {
  
      entity = new GlobalRootDepositCounter(id)
      entity.current = BigInt.fromI32(0)
  
    }
    return entity as GlobalRootDepositCounter
}

function getGlobalRootExitCounter(): GlobalRootExitCounter {
    // Only one entry will be kept in this entity
    let id = 'global-root-exit-counter'
    let entity = GlobalRootExitCounter.load(id)
    if (entity == null) {
  
      entity = new GlobalRootExitCounter(id)
      entity.current = BigInt.fromI32(0)
  
    }
    return entity as GlobalRootExitCounter
}

function getGlobalRootDepositEtherCounter(): GlobalRootDepositEtherCounter {
  // Only one entry will be kept in this entity
  let id = 'global-root-deposit-ether-counter'
  let entity = GlobalRootDepositEtherCounter.load(id)
  if (entity == null) {

    entity = new GlobalRootDepositEtherCounter(id)
    entity.current = BigInt.fromI32(0)

  }
  return entity as GlobalRootDepositEtherCounter
}

export function handleRootChainManagerDepositEther(call: DepositEtherForCall): void {
  let id = call.transaction.hash.toHex()
  let counter = getGlobalRootDepositEtherCounter()
  let updated = counter.current.plus(BigInt.fromI32(1))
  counter.current = updated
  counter.save()

  let transaction = new RootDepositEther(id)
  
  transaction.timestamp = call.block.timestamp
  transaction.transactionHash = call.transaction.hash
  transaction.value = call.transaction.value
  transaction.user = call.inputs.user
  transaction.counter = updated
  //save exit transaction
  transaction.save()
}
