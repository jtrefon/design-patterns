

export interface IParcel {
    trackingNumber: number;
    carrier: string;
}

export interface IParcelManipulation {
    parcels: IParcel[];
    save(_parcel: IParcel): void;
    collectionUpdate(_parcel: IParcel): void
}
export interface ITransportService {
 save(_parcel: IParcel): Promise<void>
 edit(_parcel: IParcel): Promise<void>
}
/**
 * Model class for single data instance 
 */
export class Parcels {
    public parcels: IParcel[];
}

/**
 * Abstract base class, blueprint for direct implementation purposes
 * @requires Parcels class
 * @requires ITransportService transport-class
 */
export abstract class ParcelManipulation implements IParcelManipulation {
    constructor(public _parcels: Parcels, public _transport: ITransportService){
    }

    parcels: IParcel[];
    public save(_parcel: IParcel): void {};
    
    collectionUpdate(_parcel: IParcel): void {
        const index = this._parcels.parcels.findIndex(p => p.trackingNumber == _parcel.trackingNumber);
        this._parcels.parcels[index] = _parcel;
    }
}


/**
 * New Parcel creation example, based on ParcelManipulation abstract
 */
export class NewParcel extends ParcelManipulation {
    parcels: IParcel[];
    public save(_parcel: IParcel): void {
        this.persist(_parcel).then( () => this.collectionUpdate(_parcel));
    }

    private async persist(_parcel: IParcel): Promise<void> {
        await this._transport.save(_parcel);
    }
}

/**
 * Edit Parcel example, based on ParcelManipulation abstract
 */
export class EditParcel extends ParcelManipulation {
    parcels: IParcel[];
    public save(_parcel: IParcel): void {
        this.persist(_parcel).then( () => this.collectionUpdate(_parcel));
    }

    private async persist(_parcel: IParcel): Promise<void> {
        await this._transport.edit(_parcel);
    }
}
