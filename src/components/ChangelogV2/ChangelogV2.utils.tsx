// Imports
import server from "../../data/changelog/server.json";
import desktop from "../../data/changelog/desktop.json";

// Determine which changelog to build.
export const program = (programName) => {
	switch(programName) {
		case 'Shoko Server':
			return server.releases
		case 'Shoko Web UI':
			return server.releases
		case 'Shoko Desktop':
			return desktop.releases
		case 'Shoko Metadata':
			return server.releases
		case 'Shokofin':
			return server.releases
	}
}

// Determine which CSS class to add based on changelog type.
export const typeColor = (type) => {

	switch (type) {
		case 'added':
			return 'changelog-type changelog-added'
		case 'changed':
			return 'changelog-type changelog-changed'
		case 'fixed':
			return 'changelog-type changelog-fixed'
		case 'removed':
			return 'changelog-type changelog-removed'
	}
}

// Generate correct link for ToC
export const versionNumber = (input) => {

	let output = ''
	for (const character of input) {
		switch (character) {
			case ' ':
				output += '-';
				break;
			case '.':
				output += '';
				break;
			case '(':
				output += '';
				break;
			case ',':
				output += '';
				break;
			case ')':
				output += '';
				break;
			default:
				output += character;
				break;
		}
	}
	return output.toLowerCase()
}
