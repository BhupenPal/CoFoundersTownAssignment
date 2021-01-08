/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React from 'react';
import sanitizeHtml from 'sanitize-html';
import PropTypes from 'prop-types';

const defaultOptions = {
	allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'],
	allowedAttributes: {
		a: ['href'],
	},
	allowedIframeHostnames: ['www.youtube.com'],
};

const sanitize = (dirty, options) => ({
	__html: sanitizeHtml(
		dirty,
		options = { ...defaultOptions, ...options },
	),
});

const SanitizeHTML = ({ html, options }) => (
	// This rules can be safely disabled because the innerHTML will be safe
	// and can't be used for xss attacks due to sanitization
	// eslint-disable-next-line react/no-danger
	<div dangerouslySetInnerHTML={sanitize(html, options)} />
);

SanitizeHTML.prototype = {
	html: PropTypes.string,
	options: PropTypes.object,
};

export default SanitizeHTML;
