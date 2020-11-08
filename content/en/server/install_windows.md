+++
title = "Windows Install"
description = "Information on how to install Shoko Server on Windows."
layout = "single"
+++

Is Shoko Server Mandatory?
The short answer is Yes.

Shoko Server is the back-end of the entire Shoko suite, which means every single program and plugin provided uses it for accessing and maintaining your anime collection. This makes Shoko Server mandatory and also means Shoko Server must be running to use any of the programs or plugins that connect to it. With the exception of file importing, Shoko Server is no more resource intensive than other programs you probably have running in the background so you don’t need to worry about Shoko Server eating up resources.

Install & First Run
Server GUI and WebUI
Starting with Version 4.0, server no longer has native Windows GUI, for configuration and installation please refer to WebUI section.
If you haven’t already done so, you’ll need to download Shoko Server, and then install it. The installer was designed to be pretty straight forward so just follow the directions until you’re done. Please note, Administrator rights are required to install and for the initial run, however after that you can run as a normal use.

Shoko Server stores all your collection metadata in an SQLite database which is created by default the first time you run Shoko Server. This file is located in %ProgramData%\ShokoServer\SQLite and is automatically maintained by Shoko so you don’t need to anything after its been created.

