// By Frode Eika Sandnes, Oslo Metropolitan University, Oslo, Norway, August 2021

// This javascript file is included in the source of the page to be analyzed
// The code that is called before page load to connect things

// Connect code to the page 
start();

// setup data-structures and conduct analyses
async function start()
	{
	await browserUpdate(); 	// a bit longer time so images gets a chance to lead

	for (var e of document.querySelectorAll("img")) // look for all images on the page
		{
		var alt = e.getAttribute("alt");		// get the alt text
		if (alt == null)
			{
			var aiText = await findArtificialAlt(e);
			e.setAttribute("alt",aiText);	//  set the new alt text in the DOM
			}
		}		
	}

// guessing the image contents - based on the tensorflow.js example
async function findArtificialAlt(img)
	{
	var artificialText = " Artificial guess: ";		
	// Load the model.
	const model = await mobilenet.load();
	// Classify the image.	
	const predictions = await model.classify(img); 
	for (var o of predictions)
		{
		if (o.probability > 0.05)	// nned to be above certain probability
			{
			artificialText += o.className+", or ";	
			}	
		}
	console.log(predictions);
	return artificialText;
	}

// Utility function browser: sleep and give control back to browser.
function browserUpdate() 
	{
	return new Promise(resolve => setTimeout(resolve, 1000));
	}	