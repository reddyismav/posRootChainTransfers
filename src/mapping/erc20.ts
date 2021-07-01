import { BigInt } from "@graphprotocol/graph-ts"
import {
  ERC20Predicate,
  LockedERC20,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  LockTokensCall,
} from "../../generated/ERC20Predicate/ERC20Predicate"
// import { ExampleEntity } from "../generated/schema"
import { lockTokensEntity } from "../../generated/schema"

export function handleLockTokens(call: LockTokensCall): void {
  let id = call.transaction.hash.toHex()
  let lockTokens = new lockTokensEntity(id)
  lockTokens.depositData = call.inputs.depositData
  lockTokens.depositReceiver = call.inputs.depositReceiver
  lockTokens.rootToken = call.inputs.rootToken
  lockTokens.depositor = call.inputs.depositor

  lockTokens.save()
}