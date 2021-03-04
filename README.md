# MMM-NiceHash
A module for Michael Teeuw's MagicMirror project that displays your NiceHash statistics. 
**This module is currently in development; Actually, there's nothing related to MagicMirror. These are only tests**

## Warning
The compilation of the files is really bad. I couldn't manage to do it properly, so I use a really bad way to do it.  
I'll solve the problem as soon as possible. I'm working on it!

## Installing
Installing the module is quite straight forward
### Step 1 - Download the module into the `modules` folder
```bash
cd MagicMirror/modules # Enter to the MagicMirror module folder
git clone https://github.com/mlbonniec/MMM-NiceHash.git # Download the module
cd MMM-NiceHash # Enter to MMM-NiceHash folder
```

### Step 2 - Add the configuration module
```js
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
```

### Step 3 - Install dependencies, build the module, and run MagicMirror
```bash
npm i # Install dependencies
npm run build # Run the building script
cd ../../ # Move to the MagicMirror folder
npm start # Run MagicMirror
```

## Use
Now you can fully use MagicMirror and the MMM-NiceHash module to display your statistics ! Enjoy it well !

## Contributing
If you find any problems, bugs or have questions, please [open a GitHub issue](https://github.com/mlbonniec/MMM-NiceHash/issues) in this repository.

* If you like this module, you can thanks Luke :wink:
