'use strict';

/**
* Set timestamp on discharge for hose connection
* @param {firstcoin.shipping.SetDischargeConnectTimestamp} transaction
* @transaction
*/
async function setConnectionTimestamp(transaction)
{
    transaction.discharge.hoseConnected = transaction.timestamp;

    const assetRegistry = await getAssetRegistry('firstcoin.shipping.Discharge');
    await assetRegistry.update(transaction.discharge);
}

/**
* Set timestamp on discharge for hose disconnection
* @param {firstcoin.shipping.SetDischargeDisconnectTimestamp} transaction
* @transaction
*/
async function setDisconnectionTimestamp(transaction)
{
    transaction.discharge.hoseDisconnected = transaction.timestamp;

    const assetRegistry = await getAssetRegistry('firstcoin.shipping.Discharge');
    await assetRegistry.update(transaction.discharge);
}
