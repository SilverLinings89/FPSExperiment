import { Domain } from "./domain";
import { Agent } from "./agent";
import { Position } from "./position";
import { SpeedGroup } from "./speed-group.enum";
import { SurfaceInteraction } from "./surface-interaction";

export class Simulation {
    agents : Agent[];
    domain: Domain;
    interaction_range = 50;
    max_steps = 500000;
    n_initial_agents = 100;

    constructor(in_n_agents : number) {
        this.n_initial_agents = in_n_agents;
        this.domain = new Domain();
    }

    compute_step() {
        for(let i = 0; i < this.agents.length; i++) {
            this.agents[i].update_velocity_and_angle();
            let new_position = this.agents[i].compute_new_position();
            new_position = this.domain.compute_position_update(this.agents[i].current_position, new_position);
            let si = new SurfaceInteraction(this.agents[i].current_position, new_position, this.domain.width, this.domain.height);
            this.agents[i].move(si);
        }

        for(let i = 0; i < this.agents.length; i++) {
            if(this.agents[i].is_alive) {
                for(let j = i+1; j < this.agents.length; j++) {
                    if(this.agents[j].is_alive) {
                        if(this.agents[i].distance_to_agent(this.agents[j]) < this.interaction_range) {
                            this.agents[i].engage(this.agents[j]);
                        }
                    }
                }
            }
        }
    }

    are_two_alive() {
        let found_one = false;
        for(let i = 0; i < this.agents.length; i++) {
            if(this.agents[i].is_alive) {
                if(found_one) {
                   return true;
                } else {
                   found_one = true;
                }
            }
        }
        return false;
    }

    n_alive() : number {
        let ret : number = 0; 
        for(let i = 0; i < this.agents.length; i++) {
            if(this.agents[i].is_alive) {
                ret ++;
            }
        }
        return ret;
    }

    is_position_safe(in_p: Position) {
        for(let i = 0; i < this.agents.length; i++) {
            if(this.agents[i].distance_to_position(in_p) < this.interaction_range) {
                return false;
            }
        }
        return true;
    }

    spawn() {
        console.log("Start spawn");
        this.agents = [];
        while(this.agents.length < this.n_initial_agents) {
            let p: Position = this.domain.random_position();
            while(!this.is_position_safe(p)) {
                p = this.domain.random_position();
            }
            let a : Agent = new Agent(SpeedGroup.SLOW, p);
            this.agents.push(a);
        }
        console.log("End spawn");
    }

    run() {
        let step = 0;
        this.spawn();
        while(step < 100000 && this.are_two_alive()) {
            if( step % 1000 == 0) {
                console.log("Step: " + step);
                console.log("There are: " + this.n_alive() + " agents alive");
                for(let i = 0; i < this.agents.length; i++) {
                    if(this.agents[i].is_alive) {
                        console.log("Agent " + i + " is at (" + this.agents[i].current_position.x + "," + this.agents[i].current_position.y + ").");
                    }
                }
            }
            this.compute_step();
            step++;
        }
        this.print_result();        
    }

    print_result() : string {
        let ret : string;
        for(let i = 0; i < this.agents.length; i++) {
            let line = "Agent " + i + " is " + (this.agents[i].is_alive ? "" : " not ") + "alive and has defeated " + this.agents[i].won_engagements;
            console.log(line);
            ret += line + "\n";
        }
        console.log("A total of " + this.n_alive() + " agents are left.");
        return ret;
    }
}
