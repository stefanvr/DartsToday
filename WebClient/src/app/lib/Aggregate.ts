export interface ActionObject {
    enabledActions: any[];
    state: any;
    convertAction(command);
}

export class Aggregate {
    private actionObject: ActionObject;
    private events = [];

    static CreateNew(createdAt, type) {
        return Aggregate.init(type, (aggregate) => {
            let initEvent =  { action: "initialized", createdAt: createdAt};
            aggregate.Apply(initEvent);
        });
    }

    static CreateFromEs(es, type) {
        return Aggregate.init(type, (aggregate) => {
            es.events.forEach(event => {
                aggregate.Apply(event);
            });
        });
    }

    private static createInstance<A extends ActionObject>(c: new () => A): A {
        return new c();
    }

    private static init(type, setup) : Aggregate {
        let aggregate = new Aggregate();
        aggregate.actionObject = Aggregate.createInstance(type); 
        setup(aggregate);
        return aggregate;
    }

    private constructor() { 
    }
    
    get enabledActions(){
        return this.actionObject.enabledActions;
    }

    state()
    {
        return this.actionObject.state;
    }

    eventSource()
    {
        return { events: this.events };
    }

    execute(command:any)
    {
       if(!this.enabledActions.includes(command.action))
       {
         console.log("Skipping disabled command :" + JSON.stringify(command));
         return;
       }

       this.Apply(this.ConvertToEvent(command));
    }

    private ConvertToEvent(command:any)
    {
        let event = this.clone(command); 
        event.action = this.actionObject.convertAction(command.action);
        return event;
    }

    private clone(command:any)
    {
      return JSON.parse(JSON.stringify(command));  
    }

    private Apply(event:any)
    {
        this.ApplyEventOnHandler(event.action, event)
        this.events.push(event);
    }

    private ApplyEventOnHandler(methodName, event)
    {
        if(this.actionObject[methodName]) {
            this.actionObject[methodName](event); 
        }
        else
        {
            console.log("Unkown event:"+ JSON.stringify(event) );
        }
    }
}  
