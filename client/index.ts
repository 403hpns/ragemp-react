class UI {
  private static _browser: BrowserMp | null;
  private static browserPath = "package://test/index.html";

  public static initialize(): void {
    this._browser = mp.browsers.new(this.browserPath);

    mp.events.add("browserDomReady", (browser: BrowserMp) => {
      if (browser === this._browser) {
        mp.gui.cursor.visible = true;

        UI.emitCef("cef.index", "from the client");
      }
    });
  }

  public static get browser(): BrowserMp {
    return this._browser || (this._browser = mp.browsers.new(this.browserPath));
  }

  public static destroyBrowser(): void {
    this._browser?.active && this._browser?.destroy();
    this._browser = null;
  }

  /**
   * Sends the data from the client to React CEF
   * @param  {string} eventName Name of the event
   * @param {unknown} args Arguments of the event
   */
  public static emitCef(eventName: string, ...args: unknown[]): void {
    if (typeof this._browser == "undefined" || !this._browser?.active) {
      throw new Error("Browser is not active.");
    }

    this._browser?.execute(
      `globalThis.window.trigger('${eventName}', '${JSON.stringify(args)}')`
    );
  }

  /**
   * Opens the browser window to the specified location
   * @param  {string} routeName Route name where the route is available (eg. /login)
   */
  public static open(routeName: string): void {
    this._browser?.execute(`window.location.href = '#/${routeName}';`);
  }
}

mp.events.add("guiReady", () => UI.initialize());

mp.events.add("sayHelloToClient", (receivedData: any) => {
  mp.gui.chat.push(receivedData);
});

/* This is an example of how you can pass the data from client to CEF using UI.emitCef */
mp.events.add("playerCommand", (command) => {
  const args = command.split(/[ ]+/);
  const commandName = args[0];

  args.shift();

  if (commandName === "dashboard") {
    UI.open("dashboard");
    UI.emitCef("cef.dashboard", {
      name: "Client",
      health: 200,
      armour: 100,
      money: 2137,
    });
  }

  if (commandName === "index") {
    UI.open("");
    UI.emitCef("cef.index", "again");
  }
});
