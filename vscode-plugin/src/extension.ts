import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const provider = new ColorsViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ColorsViewProvider.viewType,
      provider
    )
  );

  context.subscriptions.push(
    vscode.window.onDidChangeActiveColorTheme((colorTheme) => {
      provider.activeColorThemeChange(colorTheme);
    })
  );
}

class ColorsViewProvider implements vscode.WebviewViewProvider {
  static readonly viewType = "monitor.view";

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((data) => {});
  }

  activeColorThemeChange(colorTheme: vscode.ColorTheme) {
    if (this._view) {
      this._view.webview.postMessage({
        type: "activeColorThemeChange",
        payload: colorTheme.kind,
      });
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "dist", "assets", "index.js")
    );

    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "dist", "assets", "index.css")
    );

    return `<!DOCTYPE html>
    <html lang="zh-CN" class="dark">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
        <script type="module" crossorigin src="${scriptUri}"></script>
        <link rel="stylesheet" crossorigin href="${styleUri}" />
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>`;
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
