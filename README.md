# MMM-NiceHash
A module for Michael Teeuw's MagicMirror project that displays your NiceHash projected income, and rigs highest temperature. The module displays colored dots according to the state of the rig.
* Green: If rig status is `MINING`
* Red: If rig status is `STOPPED`, `OFFLINE`, `ERROR` or `DISABLED`
* Grey: If rig status is `BENCHMARKING`, `PENDING`, `TRANSFERRED`, `UNKNOWN` or other else.

## Screenshot
![MMM-NiceHash Screenshot](https://user-images.githubusercontent.com/29955402/110028479-96b23e80-7d33-11eb-8c4e-f3a973e2ae89.png)

## Warning
The compilation of the files is really bad. I couldn't manage to do it properly, so I use a really bad way to do it.  
I'll solve the problem as soon as possible. I'm working on it!

## Installing
Installing the module is quite straight forward
### Step 1 - Download the module into the `modules` folder
```bash
cd MagicMirror/modules
git clone https://github.com/mlbonniec/MMM-NiceHash.git
cd MMM-NiceHash
```

### Step 2 - Add the configuration module
Go to the config folder inside `path/to/MagicMirror/config`, and edit the `config.js` file. Then, add this part of code inside the `modules` list.
```js
modules: [
  /* Some other modules */
  {
    module: "MMM-NiceHash",
    position: "top_left", // Place the module where you want
    header: "NiceHash", // Optional
    config: {
      apiKey: "YOUR API KEY",
      apiSecret: "YOUR API SECRET KEY",
      organizationId: "YOU ORGANIZATION ID"
    }
  }
]
```

### Step 3 - Install dependencies, build the module
```bash
npm i
npm run build
```
You can now run MagicMirror as you usually do.

## Use
Now you can fully use MagicMirror and the MMM-NiceHash module to display your statistics ! Enjoy it well !

## Contributing
If you find any problems, bugs or have questions, please [open a GitHub issue](https://github.com/mlbonniec/MMM-NiceHash/issues) in this repository.  
If you like this module, you can thank Luke :wink:
