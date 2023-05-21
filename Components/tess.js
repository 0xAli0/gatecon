import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { KompleClient } from "komplejs";

const client = await SigningCosmWasmClient.connectWithSigner(
    "https://rpc.cosmwasm.hub.hackatom.org",
    wallet,
);

KompleClient