import { Position } from "./position";

export class SurfaceInteraction {
    flip_x : boolean = false;
    flip_y : boolean = false;
    final_position: Position;

    constructor(public old_position: Position, public new_position: Position, private width: number, private height: number) {
        if(new_position.x > width ||new_position.x < 0) {
            this.flip_x = true;
        }
        if(new_position.y > height ||new_position.y < 0) {
            this.flip_y = true;
        }
        this.final_position = new_position;
        if(this.flip_x) {
            if(this.new_position.x < 0 ) {
                this.final_position.x = -this.new_position.x;
            } else {
                this.final_position.x = this.width - (this.new_position.x - this.width);
            }
        } else {
            this.final_position.x = this.new_position.x;
        }
        if(this.flip_y) {
            if(this.new_position.y < 0 ) {
                this.final_position.y = -this.new_position.y;
            } else {
                this.final_position.y = this.height - (this.new_position.y - this.height);
            }
        } else {
            this.final_position.y = this.new_position.y;
        }
    }

    process_angle(in_angle: number): number {
        if(this.flip_x && this.flip_y) {
            return (in_angle + Math.PI) % (2*Math.PI);
        } else {
            if(this.flip_x) {
                return Math.PI + (Math.PI - in_angle);
            }
            if(this.flip_y) {
                if(in_angle < Math.PI) {
                    return Math.PI - in_angle;
                } else {
                    return 2 * Math.PI - (in_angle - Math.PI); 
                }
            }
            return in_angle;
        }
    }
}
