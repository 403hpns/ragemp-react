window.EventManager = {
  events: {},

  addHandler: function (eventName, handler) {
    if (eventName in this.events) {
      this.events[eventName].push(handler);
    } else {
      this.events[eventName] = [handler];
    }

    console.log(
      `[EventManager] Added event! {eventName: ${eventName}, handler: ${handler}}`
    );

    console.log(`All events registered now:`);
    console.log(this.events);
  },

  removeHandler: function (eventName, handler) {
    if (eventName in this.events) {
      var index = this.events[eventName].indexOf(handler);
      this.events[eventName].splice(index, 1);
    }

    console.log(
      `[EventManager] Removed event! {eventName: ${eventName}, handler: ${handler}}`
    );
  },
};

// Handle events from client
window.trigger = function (eventName, args) {
  console.info("window.trigger called");
  console.info(`eventName: ${eventName}, args: ${args}`);

  var handlers = window.EventManager.events[eventName];
  console.log(handlers);

  handlers?.forEach((handler) => handler(JSON.parse(args)));

  console.info(`Events in EventManager`);
  console.info(window.EventManager.events);

  console.log("Handlers end");
  console.log(handlers);
};
