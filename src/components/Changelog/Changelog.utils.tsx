// Imports
import server from "../../data/changelog/server.json";
import desktop from "../../data/changelog/desktop.json";

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