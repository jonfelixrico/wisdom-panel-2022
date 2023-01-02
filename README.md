# Wisdom (wisdom-panel-2022)

Panel for the Wisdom Discord Bot

## Setting up your development environment

### Install `node` and `pnpm`

Make sure you have the proper `node` and `pnpm` versions installed.

Please refer to the `engines` section in the `package.json` file for the versions.

### Install the dependencies

Run the command to install dependencies:

```bash
pnpm i
```

## Running the development environment

### Option 1: Using mocks

#### **Launch the back-end mock server**

Use the command to launch the BE mock server.

```bash
pnpm mocks
```

You can access the mock BE server via http://localhost:9081.

#### **Launch the front-end dev server**

Use the command to launch the FE dev server.

```bash
pnpm start:dev
```

You can access the FE via http://localhost:9080. Make sure your mock server is already up for it to work properly.

### Option 2: Using a live backend

#### **Launch the front-end server**

Use this command to launch the FE dev server. Using this command tells the FE dev server to connect to the backend at http://localhost:9085.

```bash
pnpm start:dev:be
```

If you hosted your BE somewhere else, you can use this command instead to tell the FE devserver the proper BE URL:

```bash
pnpm start:dev --proxyTargetUrl <backend URL>
```

Examples:

```bash
pnpm start:dev --proxyTargetUrl http://localhost:9099
pnpm start:dev --proxyTargetUrl http://some-website-here.com
```
