import { Position } from "./position";
import { SpeedGroup } from "./speed-group.enum";
import { SuccessRateDistribution } from "./success-rate-distribution.enum";
import { SurfaceInteraction } from "./surface-interaction";

export class Agent {
    current_direction: number;
    current_velocity: number;
    success_rate_type: SuccessRateDistribution;
    current_position: Position;
    turnrate: number = 0.1;
    speed_group: SpeedGroup;
    is_alive: boolean = true;
    won_engagements: number = 0;
    covered_distance: number = 0;

    constructor (in_sg: SpeedGroup, in_position: Position) {
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
        this.is_alive = true;
        this.won_engagements = 0;
        this.covered_distance = 0;
        this.current_position = in_position;
    }

    move(si: SurfaceInteraction) {
        this.covered_distance += this.current_position.subtract(si.new_position).norm();
        this.current_position = si.final_position;
        this.current_direction = si.process_angle(this.current_direction);
    }

    win_engagement() {
        this.won_engagements++;
    }

    die() {
        this.is_alive = false;
    }

    update_velocity_and_angle() {
        if(this.is_alive) {
            this.current_direction += this.turnrate * (Math.random()-0.5);
        }
    }

    compute_new_position(): Position {
        if(this.is_alive) {
            let ret : Position = this.current_position;
            ret.x += Math.cos(this.current_direction) * this.current_velocity;
            ret.y += Math.sin(this.current_direction) * this.current_velocity;
            return ret;
        } else {
            return this.current_position;
        }
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

    distance_to_agent(other_agent: Agent) {
        return this.distance_to_position(other_agent.current_position);
    }

    distance_to_position(in_p: Position) {
        return in_p.subtract(this.current_position).norm();
    }

    engage(other_agent: Agent) {
        if(this.is_alive && other_agent.is_alive) {
            let own_chance = this.compute_success_rate(other_agent.current_position);
            let other_chance = other_agent.compute_success_rate(this.current_position);
            let chance = Math.random() * (own_chance + other_chance);
            if(chance < own_chance) {
                this.win_engagement();
                other_agent.die();
            } else {
                this.die();
                other_agent.win_engagement();
            }
        }
    }
}
