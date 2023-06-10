import { Address } from "locklift";

export type Callback = [
  Address,
  { value: string | number } & { payload: string },
][];

type NftFileMetadata = {
  source: string;
  mimetype: string;
};

interface AtributeMetadata {
  trait_type: string;
  value: string;
  display_type?: string;
}

export interface NftJsonMetadata {
  name?: string;
  description?: string;
  external_url?: string;
  preview?: NftFileMetadata;
  files?: Array<NftFileMetadata>;
  attributes?: Array<AtributeMetadata>;
}
