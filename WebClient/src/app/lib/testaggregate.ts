import  * as DateTime from '../lib/datetime';
import { ActionObject, CMD_UNDO } from './aggregate';

export const CREATE_DATE = DateTime.now();
export const PAYLOAD = "my payload";

export const COMMAND_TO_CONVERT  = { action: -1 }
export const COMMMAND_ENABLED = { action: "enabledCommand", payload: PAYLOAD }
export const COMMMAND_DISABLED = { action: "disabledCommand" }
export const COMMMAND_UNKOWN = { action: "unkownHandler" }

export class TestAggregate implements  ActionObject
{
    enabledActions: any[];
    state: any = { createdAt: null, customData: null, payload: null, eventData: null }
    
    convertAction(command) {
       return command === COMMAND_TO_CONVERT.action ? "convertedCommand" : command; 
    }

    initialized(event) {  
        this.state.createdAt = event.createdAt;
        this.enabledActions = [ "enabledCommand", COMMAND_TO_CONVERT.action, "unkownHandler", CMD_UNDO ]
    }
    
    disabledCommand(event) {  
        this.state.customData = "disabled";
    }

    enabledCommand(event) {  
        this.state.customData = "enabled";
        this.state.payload = event.payload;
    }

    convertedCommand(event) { 
        this.state.customData = "converted";
    }

    eventHandler_myEvent(event) {
        this.state.eventData = event.data;
    }
}
