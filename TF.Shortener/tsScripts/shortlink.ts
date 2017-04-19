import {ISerializable} from './serializable';

export class ShortLink implements ISerializable<ShortLink> {

    ShortPath: String;
    CreateDate: Date;
    Count: number;
    Uri: URL;

    getShortUriString(): string {
        var location = window.location.protocol + "//" + window.location.host;
        if (!location.endsWith("/")) {
            location += "/";
        }
        return location + this.ShortPath;
    }

    getLongUriString() {
        return this.Uri.toString();
    }

    deserialize(input): ShortLink {
        this.ShortPath = input.ShortPath;
        this.CreateDate = input.CreateDate;
        this.Count = input.Count;
        this.Uri = input.Uri;
        return this;
    }

}