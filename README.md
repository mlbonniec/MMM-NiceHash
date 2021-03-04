# MMM-NiceHash

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
npm i
npm run build
cd ../../
npm start
```

## Use
Now you can fully use MagicMirror and the MMM-NiceHash module to display your statistics ! Enjoy it well !

## Contributing
If you find any problems, bugs or have questions, please [open a GitHub issue](https://github.com/mlbonniec/MMM-NiceHash/issues) in this repository.  
If you like this module, you can thank Luke :wink:
