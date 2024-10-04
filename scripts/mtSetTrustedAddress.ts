import type { NetworkProvider } from '@ton/blueprint';
import { toNano, Address } from '@ton/core';
import { MultichainToken } from '../wrappers/MultichainToken';
import { sleep30 } from '../utils/sleep30';
import mtContractAddress from '../deployed/multichain.json';

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();
    const sender = provider.sender();
    const owner = sender.address!;
    ui.write('Owner address '+owner);
    
    const multichainToken = provider.open(
        MultichainToken.createFromAddress(
            Address.parse(mtContractAddress.multichainToken)
        ),
    );
    //0:d63659b27081e7af87bb23bcb03c45b95a9d06fe089c15c0dfd5e365dde32183
    ui.write('0:d63659b27081e7af87bb23bcb03c45b95a9d06fe089c15c0dfd5e365dde32183');
    const addr = await ui.inputAddress('MultichainToken new Trusted address:');

    const trustedAddress = '0x'+addr.hash.toString('hex'); 
    await multichainToken.sendAddTrustedAddress(sender, toNano('0.1'), {
        chainId: 11155111,
        trustedAddress: trustedAddress,
    });
    await sleep30(ui);

    await multichainToken.sendAddTrustedAddress(sender, toNano('0.1'), {
        chainId: 40001,
        trustedAddress: trustedAddress,
    });
    await sleep30(ui);

    ui.write('Multichain token data:');
    await multichainToken.getData();

    ui.write('Done!');
}