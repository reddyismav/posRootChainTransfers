import { UpdatedStake } from '../../generated/schema'
import { StakeUpdate } from '../../generated/StakingInfo/StakingInfo'

export function handleStakeUpdate(event: StakeUpdate): void {
    let id = event.transaction.hash.toHex();
    let updatedStake = new UpdatedStake(id);

    updatedStake.amount = event.params.newAmount;
    updatedStake.nonce = event.params.nonce;
    updatedStake.validatorId = event.params.validatorId;
    updatedStake.blockNumber = event.block.number;
    updatedStake.transactionHash = event.transaction.hash;
    updatedStake.logIndex = event.logIndex;
    updatedStake.transactionLogIndex = event.transactionLogIndex;

    updatedStake.save();
}