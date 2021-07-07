import { BigInt } from "@graphprotocol/graph-ts"
import {
  LockTokensCall,
  ExitTokensCall
} from "../../generated/ERC721Predicate/ERC721Predicate"
// import { ExampleEntity } from "../generated/schema"
import { lockTokensERC721, lockTokensERC721Counter, exitTokensERC721, exitTokensERC721Counter } from "../generated/schema"

export function handleLockTokensErc721(call: LockTokensCall): void {
  let counter = getLockTokensERC721Counter()
  let updated = counter.current.plus(BigInt.fromI32(1))
  counter.current = updated
  counter.save()

  let id = call.transaction.hash.toHex()
  let lockTokens = new lockTokensERC721(id)
  lockTokens.depositData = call.inputs.depositData
  lockTokens.depositReceiver = call.inputs.depositReceiver
  lockTokens.rootToken = call.inputs.rootToken
  lockTokens.depositor = call.inputs.depositor
  lockTokens.counter = updated
  lockTokens.save()
}

export function handleExitTokensErc721(call: ExitTokensCall): void {
  let counter = getExitTokensERC721Counter()
  let updated = counter.current.plus(BigInt.fromI32(1))
  counter.current = updated
  counter.save()

  let id = call.transaction.hash.toHex()
  let exitTokens = new exitTokensERC721(id)
  exitTokens.withdrawer = call.inputs.withdrawer
  exitTokens.rootToken = call.inputs.rootToken
  exitTokens.log = call.inputs.log
  exitTokens.counter = updated
  exitTokens.save()
}

function getExitTokensERC721Counter(): exitTokensERC721Counter {
  // Only one entry will be kept in this entity
  let id = 'exit-tokens-erc721-counter'
  let entity = exitTokensERC721Counter.load(id)
  if (entity == null) {

    entity = new exitTokensERC721Counter(id)
    entity.current = BigInt.fromI32(0)

  }
  return entity as exitTokensERC721Counter
}


function getLockTokensERC721Counter(): lockTokensERC721Counter {
  // Only one entry will be kept in this entity
  let id = 'lock-tokens-erc721-counter'
  let entity = lockTokensERC721Counter.load(id)
  if (entity == null) {

    entity = new lockTokensERC721Counter(id)
    entity.current = BigInt.fromI32(0)

  }
  return entity as lockTokensERC721Counter
}
