import { Position } from "./position";

export class Domain {
    n_obstacles: number = 0;
    width: number = 800;
    height: number = 800;

    is_valid_position(in_position: Position) {
        if(in_position.x <= this.width && in_position.x >= 0) {
            if(in_position.y <= this.height && in_position.y >= 0) {
                return true;
            }
        }
        return false;
    }

    compute_position_update(old_position: Position, new_position: Position) : Position {
        if(this.is_valid_position(new_position)) {
            return new_position;
        } else {
            return old_position;
        }
    }

    random_position(): Position {
        let ret = new Position();
        ret.x = Math.random() * this.width;
        ret.y = Math.random() * this.height;
        return ret;
    }
}
