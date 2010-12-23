describe('Form.Validator', function(){

	describe('Validators', function(){

		getValidator = Form.Validator.getValidator.bind(Form.Validator);

		function createInput(value){
			return new Element('input', {
				value: value
			});
		}

		describe('required', function(){

			var validator = getValidator('required');

			it('should return false for fields with no value', function(){
				expect(validator.test(createInput(null))).toEqual(false);
			});

			it('should return true for fields with a value', function(){
				expect(validator.test(createInput('foo'))).toEqual(true);
			});

		});

		describe('minLength', function(){

			var validator = getValidator('minLength');

			function minLength(value){
				return { minLength: value };
			}

			it('should return false for fields with a length less than the specified minLength', function(){
				expect(validator.test(createInput('12345'), minLength(10))).toEqual(false);
			});

			it('should return true for fields with a length greater than the specified minLength', function(){
				expect(validator.test(createInput('12345'), minLength(3))).toEqual(true);
			});

			it('should return true for fields with a length equal to the specified minLength', function(){
				expect(validator.test(createInput('12345'), minLength(5))).toEqual(true);
			});

		});

		describe('maxLength', function(){

			var validator = getValidator('maxLength');

			function maxLength(value){
				return { maxLength: value };
			}

			it('should return false for fields with a length greater than the specified maxLength', function(){
				expect(validator.test(createInput('12345'), maxLength(3))).toEqual(false);
			});

			it('should return true for fields with a length less than the specified maxLength', function(){
				expect(validator.test(createInput('12345'), maxLength(10))).toEqual(true);
			});

			it('should return true for fields with a length equal to the specified maxLength', function(){
				expect(validator.test(createInput('12345'), maxLength(5))).toEqual(true);
			});

		});

		describe('validate-integer', function(){

			var validator = getValidator('validate-integer');

			it('should return false for fields whose value is not an integer', function(){
				expect(validator.test(createInput('a'))).toEqual(false);
				expect(validator.test(createInput('4.1'))).toEqual(false);
				expect(validator.test(createInput('1a'))).toEqual(false);
			});

			it('should return true for fields whose value is an integer', function(){
				expect(validator.test(createInput(5))).toEqual(true);
			});

		});

		describe('validate-numeric', function(){

			var validator = getValidator('validate-numeric');

			it('should return false for fields whose value is not a number', function(){
				expect(validator.test(createInput('a'))).toEqual(false);
				expect(validator.test(createInput('1a'))).toEqual(false);
			});

			it('should return true for fields whose value is a number', function(){
				expect(validator.test(createInput(5))).toEqual(true);
				expect(validator.test(createInput('4.1'))).toEqual(true);
			});

		});

		describe('validate-digits', function(){

			var validator = getValidator('validate-digits');

			it('should return false for fields whose value is not a digit', function(){
				expect(validator.test(createInput('a'))).toEqual(false);
				expect(validator.test(createInput('1a'))).toEqual(false);
			});

			it('should return true for fields whose value is a digit', function(){
				expect(validator.test(createInput(5))).toEqual(true);
				expect(validator.test(createInput('4.1'))).toEqual(true);
				});

			it('should return true for fields which contain punctuation and spaces', function(){
				expect(validator.test(createInput('000-000-0000'))).toEqual(true);
				expect(validator.test(createInput('000 000 0000'))).toEqual(true);
				expect(validator.test(createInput('000.000.0000'))).toEqual(true);
				expect(validator.test(createInput('000#000#0000'))).toEqual(true);
				expect(validator.test(createInput('000:000:0000'))).toEqual(true);
				expect(validator.test(createInput('000+000+0000'))).toEqual(true);
				expect(validator.test(createInput('#(000)-000-0000:0000'))).toEqual(true);
			});

		});

		describe('validate-alpha', function(){

			var validator = getValidator('validate-alpha');

			it('should return false for fields whose value contains anything that is not a letter', function(){
				expect(validator.test(createInput('Mr. Foo'))).toEqual(false);
				expect(validator.test(createInput('Jacob The 2nd'))).toEqual(false);
				expect(validator.test(createInput(123))).toEqual(false);
			});

			it('should return true for fields whose value only contains letters', function(){
				expect(validator.test(createInput("CamelFoo"))).toEqual(true);
			});

		});

		describe('validate-alphanum', function(){

			var validator = getValidator('validate-alphanum');

			it('should return false for fields whose value contains anything that\s not a letter or number', function(){
				expect(validator.test(createInput('Mr. Foo'))).toEqual(false);
				expect(validator.test(createInput('Jacob The 2nd'))).toEqual(false);
			});

			it('should return true for fields whose value only contains letters and numbers', function(){
				expect(validator.test(createInput(123))).toEqual(true);
				expect(validator.test(createInput('CamelFoo222'))).toEqual(true);
			});

		});

		describe('validate-date', function(){

			var validator = getValidator('validate-date');

			it('should return false for fields whose value is not a date', function(){
				expect(validator.test(createInput('Mr. Foo'))).toEqual(false);
				expect(validator.test(createInput('blah 12, 1000'))).toEqual(false);
				expect(validator.test(createInput('boo 12'))).toEqual(false);
			});

			it('should return true for fields whose value parses to a date', function(){
				expect(validator.test(createInput('Nov 12'))).toEqual(true);
				expect(validator.test(createInput('10-10-2000'))).toEqual(true);
				expect(validator.test(createInput('Nov 10, 2010'))).toEqual(true);
			});

		});

		describe('validate-email', function(){

			var validator = getValidator('validate-email');

			it('should return false for fields whose value is not a valid email address', function(){
				expect(validator.test(createInput('foobar@gmail..com'))).toEqual(false);
				expect(validator.test(createInput('foobar12312_fd@@@@gmail.com'))).toEqual(false);
				expect(validator.test(createInput('@#@#@(*&##(*@gmail.com'))).toEqual(false);
			});

			it('should return true for fields whose value is a valid email address', function(){
				expect(validator.test(createInput('foo#bar@gmail.com'))).toEqual(true);
				expect(validator.test(createInput('foo.bar@gmail.com'))).toEqual(true);
				expect(validator.test(createInput('foobar@gmail.com'))).toEqual(true);
				expect(validator.test(createInput('foobar@gmail.asdf.com'))).toEqual(true);
				expect(validator.test(createInput('foobar12312_fd@gmail.com'))).toEqual(true);
			});

		});

		describe('validate-url', function(){

			var validator = getValidator('validate-url');

			it('should return false for fields whose value is not a url', function(){
				expect(validator.test(createInput('asdfasdfasdfasdf'))).toEqual(false);
				expect(validator.test(createInput('http12341:3143'))).toEqual(false);
			});

			it('should return true for fields whose value is a valid url', function(){
				expect(validator.test(createInput('https://www.foo.org'))).toEqual(true);
				expect(validator.test(createInput('https://foo.org/asdf/asdf'))).toEqual(true);
				expect(validator.test(createInput('https://foo.org/asdf/asdf.png'))).toEqual(true);
				expect(validator.test(createInput('https://foo.org'))).toEqual(true);
				expect(validator.test(createInput('https://foo.org:8000'))).toEqual(true);
				expect(validator.test(createInput('https://foo.org:8000?asdfasd'))).toEqual(true);
				expect(validator.test(createInput('https://foo.org:8000?asdfasd&bar=asdf'))).toEqual(true);
			});

		});

		describe('validate-currency-dollar', function(){

			var validator = getValidator('validate-currency-dollar');

			it('should return false for fields whose value is not currency', function(){
				expect(validator.test(createInput('$$100000.00'))).toEqual(false);
				expect(validator.test(createInput('$ 100000.00'))).toEqual(false);
				expect(validator.test(createInput('$ 1000,00.00'))).toEqual(false);
				expect(validator.test(createInput('$100000 bucks'))).toEqual(false);
			});

			it('should return true for fields whose value is currency', function(){
				expect(validator.test(createInput('$100,000.00'))).toEqual(true);
				expect(validator.test(createInput('$100000.00'))).toEqual(true);
				expect(validator.test(createInput('$100000'))).toEqual(true);
				expect(validator.test(createInput('$1000.00'))).toEqual(true);
				expect(validator.test(createInput('$0.00'))).toEqual(true);
				expect(validator.test(createInput('$.00'))).toEqual(true);

				expect(validator.test(createInput('100,000.00'))).toEqual(true);
				expect(validator.test(createInput('100000.00'))).toEqual(true);
				expect(validator.test(createInput('100000'))).toEqual(true);
				expect(validator.test(createInput('1000.00'))).toEqual(true);
				expect(validator.test(createInput('0.00'))).toEqual(true);
				expect(validator.test(createInput('.00'))).toEqual(true);
			});

		});

		describe('validate-one-required', function(){

			var validator = getValidator('validate-one-required'),
				collection = new Element('div').adopt(
					['', '', '', ''].map(function(value){
						return createInput(value);
					})
				),
				elementWithValue = createInput('foo').inject(collection);
				elementWithoutValue = createInput('').inject(collection);

			it('should return true if atleast one of an elements siblings have a value', function(){
				this.after(elementWithValue.destroy.bind(elementWithValue));
				expect(validator.test(elementWithValue)).toEqual(true);
			});

			it('should return false if none of an elements siblings have a value', function(){
				expect(validator.test(elementWithoutValue)).toEqual(false);
			});

		});

	});

});
