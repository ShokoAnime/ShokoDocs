---
layout: sub
title: {title}
permalink: {link}
---
<!-- Sidebar -->
<aside class="col-lg-2 col-md-3 col-sm-3 sidebar">
	<ul class="nav sidenav dropable sticky">
		<li><a class="has-child" href="#whats-covered">Link 1</a>
			<ul>
				<li><a href="#whats-covered">Sub-Link 1</a></li>
				<li><a href="#whats-covered">Sub-Link 2</a></li>
			</ul>
		</li>
		<li><a class="has-child" href="#whats-covered">Link 2</a>
			<ul>
				<li><a href="#whats-covered">Sub-Link 1</a></li>
				<li><a href="#whats-covered">Sub-Link 2</a></li>
			</ul>
		</li>
	</ul>
</aside>

<article class="col-lg-10 col-md-9 col-sm-9 main-content" role="main">

#Heading 1
This is some body content

## Heading 2

`code block` *italic* **bold** __underline__ ~~strikeout~~

{% highlight bash %}

#!/bin/bash
var=1

{% endhighlight %}
</article>