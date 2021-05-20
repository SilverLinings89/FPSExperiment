import { Position } from "./position";
import { SpeedGroup } from "./speed-group.enum";
import { SuccessRateDistribution } from "./success-rate-distribution.enum";

export class Agent {
    current_direction: number;
    current_velocity: number;
    success_rate_type: SuccessRateDistribution;
    current_position: Position;
    turnrate: number = 0.1;
    speed_group: SpeedGroup;

    Agent(in_sg: SpeedGroup) {
        this.current_direction = 2 * Math.PI * Math.random();
        this.speed_group = in_sg;
        if(in_sg == SpeedGroup.NONE) {
            this.current_velocity = 0;
        }
        if(in_sg == SpeedGroup.SLOW) {
            this.current_velocity = 0.5;
        }
        if(in_sg == SpeedGroup.NONE) {
            this.current_velocity = 1.0;
        }
        
    }

    update_velocity_and_angle() {
        this.current_direction += this.turnrate * (Math.random()-0.5);
    }

    compute_new_position(): Position {
        let ret : Position = this.current_position;
        ret.x += Math.cos(this.current_direction) * this.current_velocity;
        ret.y += Math.sin(this.current_direction) * this.current_velocity;
        return ret;
    }

    compute_success_rate(other_position: Position) {
        let angle = (other_position.subtract(this.current_position).angle() / Math.PI) * 360;
        switch(this.success_rate_type) {
            case SuccessRateDistribution.CONSTANT:
                return 0.5;
            case SuccessRateDistribution.LINEAR:
                return 1.0 - angle/180;
            case SuccessRateDistribution.PLATEAU_LINEAR:
                if(angle < 20) return 1;
                if(angle > 160) return 1;
                return 1.0 - (angle-20)/140;
            case SuccessRateDistribution.POLY:
                let x = angle/180;
                return 2*x*x*x - 3*x*x + 1;
        }
    }

    distance_to(other_agent: Agent) {
        return other_agent.current_position.subtract(this.current_position).norm();
    }
}
