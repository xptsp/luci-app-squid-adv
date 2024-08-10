'use strict';
'require view';
'require form';

return view.extend({
	render: function() {
		var s, o, m, t;
		m = new form.Map('squid', _('How To Install Certificate'));

		s = m.section(form.TypedSection, 'squid');
		s.anonymous = true;

		o = s.option( form.DummyValue, 'meh');
		o.renderWidget = function() {
			return E([], [
				E('style', {}, [
					'.media { min-height: 110px; vertical-align: top; }',
					'.media-img { width: 64px; margin-right: 1rem !important; margin: 10px; vertical-align: top; }',
					'.media-body { padding-top: 1rem; padding-bottom: 1rem; margin-top: -20px; }',
					'.instructions { padding-top: 1rem; padding-bottom: 1rem; }',
					'.show-instructions:target, .hide-instructions, .instructions { display: none; }',
					'.show-instructions:target ~ .hide-instructions { display: inline-block; }',
					'.show-instructions:target ~ .instructions { display: inherit; }',
					'h4 { margin: 0; }',
					'h5 { margin: 0; }',
				]),
				E('table', { 'width': '100%' }, [
					E('tr', {}, [
						E('th', { 'style': 'width: 96px' }, ''),
						E('th', { 'style': 'width: 100%' }, ''),
					]),
					E('tr', {}, [
						E('td', { 'class': 'media-img' }, [
							E('img', { 'class': 'media-img', 'src': '/luci-static/resources/view/squid-adv/svg/windows.svg' }, ''),
						]),
						E('td', { 'class': 'media-body' }, [
							E('h4', {}, 'Windows'),
							E('a', { 'class': 'btn btn-sm cbi-button-apply', 'href': '/ca/squid-ca.p12' }, '🔏 ' + _('Get') + ' squid-ca.p12'), ' ',
							E('a', { 'class': 'btn btn-sm cbi-button show-instructions', 'href': '#Windows', 'id': 'Windows' }, _('Show Instructions')),
							E('a', { 'class': 'btn btn-sm btn-info hide-instructions', 'href': '#' }, '📖 ' + _('Hide Instructions')),
							E('div', { 'class': 'instructions' }, [
								E('h5', {}, _('Manual Installation')),
								E('ol', {}, [
									E('li', {}, _('Double-click the P12 file to start the import wizard.')),
									E('li', {}, _('Select a certificate store location. This determines who will trust the certificate – only the current Windows user or everyone on the machine. Click Next')),
									E('li', {}, _('Click Next again.')),
									E('li', {}, _('Leave Password blank and click Next.')),
									E('li', {}, _('Select Place all certificates in the following store, then click Browse, and select Trusted Root Certification Authorities.') + '<br>' + _('Click OK and Next.')),
									E('li', {}, _('Click Finish.')),
									E('li', {}, _('Click Yes to confirm the warning dialog.')),
								]),
								E('br'),
								E('h5', {}, _('Automated Installation')),
								E('ol', {}, [
									E('li', {}, [
										E('code', {}, 'certutil.exe -addstore root squid-ca.cer'),
										' (', E('a', { 'href': 'https://technet.microsoft.com/en-us/library/cc732443.aspx' }, _('details')), ')',
									]),
								]),
							]),
						]),
					]),
					E('tr', {}, [
						E('td', { 'class': 'media-img' }, [
							E('img', { 'class': 'media-img', 'src': '/luci-static/resources/view/squid-adv/svg/linux.svg' }, ''),
						]),
						E('td', { 'class': 'media-body' }, [
							E('h4', {}, 'Linux'),
							E('a', { 'class': 'btn btn-sm cbi-button-apply', 'href': '/ca/squid-ca.pem' }, '🔏 ' + _('Get') + ' squid-ca.pem'), ' ',
							E('a', { 'class': 'btn btn-sm cbi-button show-instructions', 'href': '#Linux', 'id': 'Linux' }, _('Show Instructions')),
							E('a', { 'class': 'btn btn-sm btn-info hide-instructions', 'href': '#' }, '📖 ' + _('Hide Instructions')),
							E('div', { 'class': 'instructions' }, [
								E('h5', {}, 'Ubuntu/Debian'),
								E('ol', {}, [
									E('li', {}, [ E('code', {}, 'mv squid-ca.pem /usr/local/share/ca-certificates/squid.crt') ]),
									E('li', {}, [ E('code', {}, 'sudo update-ca-certificates') ]),
								]),
								E('br'),
								E('h5', {}, 'Fedora'),
								E('ol', {}, [
									E('li', {}, [ E('code', {}, 'mv squid-ca.pem /etc/pki/ca-trust/source/anchors/') ]),
									E('li', {}, [ E('code', {}, 'sudo update-ca-trust') ]),
								]),
							]),
						]),
					]),
					E('tr', {}, [
						E('td', { 'class': 'media-img' }, [
							E('img', { 'class': 'media-img', 'src': '/luci-static/resources/view/squid-adv/svg/mac.svg' }, ''),
						]),
						E('td', { 'class': 'media-body' }, [
							E('h4', {}, 'Mac'),
							E('a', { 'class': 'btn btn-sm cbi-button-apply', 'href': '/ca/squid-ca.pem' }, '🔏 ' + _('Get') + ' squid-ca.pem'), ' ',
							E('a', { 'class': 'btn btn-sm cbi-button show-instructions', 'href': '#Mac', 'id': 'Mac' }, _('Show Instructions')),
							E('a', { 'class': 'btn btn-sm btn-info hide-instructions', 'href': '#' }, '📖 ' + _('Hide Instructions')),
							E('div', { 'class': 'instructions' }, [
								E('h5', {}, _('Manual Installation')),
								E('ol', {}, [
									E('li', {}, _('Double-click the PEM file to open the Keychain Access application.')),
									E('li', {}, _('Locate the new certificate "squid" in the list and double-click it.')),
									E('li', {}, _('Change Secure Socket Layer (SSL) to Always Trust.')),
									E('li', {}, _('Close the dialog window and enter your password if prompted.')),
								]),
								E('br'),
								E('h5', {}, _('Automated Installation')),
								E('oi', {}, [
									E('li', {}, [ E('code', {}, 'sudo security add-trusted-cert -d -p ssl -p basic -k /Library/Keychains/System.keychain squid-ca.pem') ]),
								]),
							]),
						]),
					]),
					E('tr', {}, [
						E('td', { 'class': 'media-img' }, [
							E('img', { 'class': 'media-img', 'src': '/luci-static/resources/view/squid-adv/svg/ios.svg' }, ''),
						]),
						E('td', { 'class': 'media-body' }, [
							E('h4', {}, [ 'iOS ', E('small', {}, [ '(', _('please read the instructions!'), ')' ]) ]),
							E('a', { 'class': 'btn btn-sm cbi-button-apply', 'href': '/ca/squid-ca.pem' }, '🔏 ' + _('Get') + ' squid-ca.pem'), ' ',
							E('a', { 'class': 'btn btn-sm cbi-button show-instructions', 'href': '#iOS', 'id': 'iOS' }, _('Show Instructions')),
							E('a', { 'class': 'btn btn-sm btn-info hide-instructions', 'href': '#' }, '📖 ' + _('Hide Instructions')),
							E('div', { 'class': 'instructions' }, [
								E('h5', {}, 'iOS 13+'),
								E('ol', {}, [
									E('li', {}, _('Use Safari to download the certificate. Other browsers may not open the proper installation prompt.')),
									E('li', {}, _('Install the new Profile (Settings -> General -> VPN &amp; Device Management).')),
									E('li', {}, [
										E('strong', {}, _('Important:')), ' ',
										_('Go to Settings -> General -> About -> Certificate Trust Settings.  Toggle squid to ON.'),
									]),
								]),
							]),
						]),
					]),
					E('tr', {}, [
						E('td', { 'class': 'media-img' }, [
							E('img', { 'class': 'media-img', 'src': '/luci-static/resources/view/squid-adv/svg/android.svg' }, ''),
						]),
						E('td', { 'class': 'media-body' }, [
							E('h4', {}, 'Android'),
							E('a', { 'class': 'btn btn-sm cbi-button-apply', 'href': '/ca/squid-ca.cer' }, '🔏 ' + _('Get') + ' squid-ca.cer'), ' ',
							E('a', { 'class': 'btn btn-sm cbi-button show-instructions', 'href': '#Android', 'id': 'Android' }, _('Show Instructions')),
							E('a', { 'class': 'btn btn-sm btn-info hide-instructions', 'href': '#' }, '📖 ' + _('Hide Instructions')),
							E('div', { 'class': 'instructions' }, [
								E('h5', {}, 'Android 10+'),
								E('ol', { 'class': 'mb-2' }, [
									E('li', {}, _('Open the downloaded CER file.')),
									E('li', {}, _('Enter squid (or anything else) as the certificate name.')),
									E('li', {}, _('For credential use, select VPN and apps.')),
									E('li', {}, _('Click OK.')),
								]),
								E('br'),
								E('p', {}, _('Some Android distributions require you to install the certificate via Settings -> Security -> Advanced -> Encryption and credentials -> Install a certificate -> CA certificate (or similar) instead.')),
								E('div', { 'class': 'alert alert-warning', 'role': 'alert' }, [
									E('p', {}, [
										E('strong', {}, _('Warning')), ': ',
										_('Apps that target Android API Level 24 (introduced in 2016) and above only accept certificates from the system trust store.  User-added CAs are not accepted unless the application manually opts in. Except for browsers, you need to patch most apps manually'),
										' (', E('a', { 'href': 'https://developer.android.com/training/articles/security-config' }, 'Android network security config'), ')'
									]),
									E('p', {}, [
										_('Alternatively, if you have rooted the device and have Magisk installed, you can install'), ' ',
										E('a', { 'href': 'https://themagisk.com/move-certificates-magisk-module/' }, _('this Magisk module')), ' ',
										_('via the Magisk Manager app.'),
									]),
								]),
							]),
						]),
					]),
					E('tr', {}, [
						E('td', { 'class': 'media-img' }, [
							E('img', { 'class': 'media-img', 'src': '/luci-static/resources/view/squid-adv/svg/firefox.svg' }, ''),
						]),
						E('td', { 'class': 'media-body' }, [
							E('h4', {}, 'Android'),
							E('a', { 'class': 'btn btn-sm cbi-button-apply', 'href': '/ca/squid-ca.pem' }, '🔏 ' + _('Get') + ' squid-ca.pem'), ' ',
							E('a', { 'class': 'btn btn-sm cbi-button show-instructions', 'href': '#FireFox', 'id': 'FireFox' }, _('Show Instructions')),
							E('a', { 'class': 'btn btn-sm btn-info hide-instructions', 'href': '#' }, '📖 ' + _('Hide Instructions')),
							E('div', { 'class': 'instructions' }, [
								E('h5', {}, 'FireFox'),
								E('ol', {}, [
									E('li', {}, _('Open Options -> Privacy & Security and click View Certificates... at the bottom of the page.')),
									E('li', {}, _('Click Import... and select the downloaded certificate.')),
									E('li', {}, _('Enable Trust this CA to identify websites and click OK.')),
								]),
							]),
						]),
					]),
					E('tr', {}, [
						E('td', { 'class': 'media-img' }, [
							E('img', { 'class': 'media-img', 'src': '/luci-static/resources/view/squid-adv/svg/other.svg' }, ''),
						]),
						E('td', { 'class': 'media-body' }, [
							E('h4', {}, 'Other Platforms'),
							E('a', { 'class': 'btn btn-sm cbi-button-apply', 'href': '/ca/squid-ca.pem' }, '🔏 ' + _('Get') + ' squid-ca.pem'), ' ',
							E('a', { 'class': 'btn btn-sm cbi-button-apply', 'href': '/ca/squid-ca.p12' }, '🔏 ' + _('Get') + ' squid-ca.p12'), ' ',
						]),
					]),
				]),
			]);
		}

		return m.render();
	},

	handleSave: null,
	handleSaveApply: null,
	handleReset: null,
})
