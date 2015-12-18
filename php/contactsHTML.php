<?php
echo <<<EOD
		<div id="cover">
		
			<div id="contactPage">			
			
				<button id="close">Close</button>
				<div id="warning">
					<p>The page has an unsaved data.<br /><br />Do You really want to leave the page?</p>
					<button class="letter">Yes</button>
					<button class="letter">No</button>
				</div>
				<div id="address">
					<ul>
						<li>
							<h4 class="address">You can contact me by:</h4>
						</li>
						<li></li>
						<li>
							<p class="addressType">Tel:</p>
							<p class="addressDescr">+38(50)759-20-16</p>
						</li>
						<li>
							<p class="addressType">Email:</p>
							<p class="addressDescr">Peers.Rom@gmail.com</p>
						</li>
						<li>
							<p class="addressType">Postal:</p>
							<p class="addressDescr">61137, Kolonnaya str, Kharkiv, Ukraine</p>
						</li>
					</ul>
				</p>
				</div>
				
				<hr class="contacts" /><br />
				
				<h4 class="address">You can find my location in the map:</h4>
				<div id="map">
					<iframe class="address" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2567.715114383253!2d36.1403859!3d49.9416866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41279fa19f5df34f%3A0xf675e22ca52b93a0!2z0JrQvtC70L7QvdC90LAg0LLRg9C7LiwgOTIsINCl0LDRgNC60ZbQsiwg0KXQsNGA0LrRltCy0YHRjNC60LAg0L7QsdC70LDRgdGC0Yw!5e0!3m2!1sru!2sua!4v1436986482787">						</iframe>
				</div>
				
				<hr class="contacts" /><br />
				
				<h4 class="address">You can send me a letter as well:</h4>
				<div id='resp'></div>
				<fieldset class="letter">
					<label>Your name:
					<input type="text" name="name" class="letter" maxlength="255"/>
					</label>
				</fieldset>
				<fieldset class="letter">
					<label>Your email:
					<input type="text" name="email" class="letter" maxlength="255"/>
					</label>
				</fieldset>
				<fieldset class="letter">
					<label>Your message:
					<textarea name="message" class="letter" maxlength="510"></textarea>
					</label>
				</fieldset>
				<fieldset class="letter">
				<button name="send" class="letter" disabled>Send</botton>
				</fieldset>
				
			</div>
			
		</div>
		<script src='../js/contacts.js'></script>
EOD;
?>