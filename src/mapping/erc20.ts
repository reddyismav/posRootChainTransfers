import { BigInt } from "@graphprotocol/graph-ts"
import {
  LockTokensCall,
  ExitTokensCall
} from "../../generated/ERC20Predicate/ERC20Predicate"

import { lockTokensERC20, lockTokensERC20Counter, exitTokensERC20, exitTokensERC20Counter } from "../generated/schema"

export function handleLockTokensErc20(call: LockTokensCall): void {
  let counter = getLockTokensERC20Counter()
  let updated = counter.current.plus(BigInt.fromI32(1))
  counter.current = updated
  counter.save()

  let id = call.transaction.hash.toHex()
  let lockTokens = new lockTokensERC20(id)
  lockTokens.depositData = call.inputs.depositData
  lockTokens.depositReceiver = call.inputs.depositReceiver
  lockTokens.rootToken = call.inputs.rootToken
  lockTokens.depositor = call.inputs.depositor
  lockTokens.counter = updated
  lockTokens.save()
}

export function handleExitTokensErc20(call: ExitTokensCall): void {
  let counter = getExitTokensERC20Counter()
  let updated = counter.current.plus(BigInt.fromI32(1))
  counter.current = updated
  counter.save()

  let id = call.transaction.hash.toHex()
  let exitTokens = new exitTokensERC20(id)
  exitTokens.withdrawer = call.inputs.withdrawer
  exitTokens.rootToken = call.inputs.rootToken
  exitTokens.log = call.inputs.log
  exitTokens.counter = updated
  exitTokens.save()
}

function getExitTokensERC20Counter(): exitTokensERC20Counter {
  // Only one entry will be kept in this entity
  let id = 'exit-tokens-erc20-counter'
  let entity = exitTokensERC20Counter.load(id)
  if (entity == null) {

    entity = new exitTokensERC20Counter(id)
    entity.current = BigInt.fromI32(0)

  }
  return entity as exitTokensERC20Counter
}



function getLockTokensERC20Counter(): lockTokensERC20Counter {
  // Only one entry will be kept in this entity
  let id = 'lock-tokens-erc20-counter'
  let entity = lockTokensERC20Counter.load(id)
  if (entity == null) {

    entity = new lockTokensERC20Counter(id)
    entity.current = BigInt.fromI32(0)

  }
  return entity as lockTokensERC20Counter
}
