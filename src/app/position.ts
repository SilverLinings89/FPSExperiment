export class Position {
    x: number;
    y: number;

    Position() {
        this.x = 0;
        this.y = 0;
    }

    subtract(other: Position): Position {
        let ret: Position;
        ret.x = this.x - other.x;
        ret.y = this.y - other.y;
        return ret;
    }

    angle(): number {
        let norm: number = this.norm();
        return Math.abs(Math.atan2(this.y / norm, this.x / norm));
    }

    norm(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
