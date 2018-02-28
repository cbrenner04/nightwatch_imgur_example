# nightwatch_imgur_example

## Prerequisites

* Install the following via brew or your favorite package manager:

  * selenium-server-standalone
  * chromedriver
  * geckodriver

* Install Chrome and Firefox
* Install dependencies

```
yarn install
```

* Add a `.env` file
* Add the following ENV variables to `.env`

  * `SELENIUM_SERVER_JAR_PATH` -- path to selenium-standalone-server jar file
  * `CHROME_DRIVER_PATH` --  path to chromedriver binary
  * `GECKO_DRIVER_PATH` -- path to geckodriver binary
  * `IMAGE_PATH` -- path to image for post test

* OPTIONAL:

  * Have an account on imgur. You can register
    [here](https://imgur.com/register). This is not strictly necessary for the
    test to pass.
  * If you do use an account, add the following to the `.env` file:

    * `IMGUR_USERNAME` -- username for imgur
    * `IMGUR_PASSWORD` -- password for imgur

## Running tests

To run tests in Firefox simply run:

```
nightwatch
```

To run tests in Chrome simply run:

```
nightwatch --env chrome
```

## Explanation

I chose to use the Page Object Model for these tests. Pages can be found under
`./pages` and tests can be found under `./tests`.

In my pages you will notice I used a mixture of xpath and css for my selectors.
It is my preference to use unique IDs or data attributes for selectors. When I
don't have control over what's on the front-end, I will try to find unique
selectors where possible or use sections / xpath to scope to an element that has
a unique selector and find the element I want from there.

Page objects are important when test suites become large and use the same
selectors and functionality across multiple tests. Obviously, here they are a
bit overkill but I like to start in a place where I can expand easily -- it may
be overkill now but a test suite can soon become unwieldy if you don't take care
early.

### post image

This test was a mild challenge.

First, I sign in to my account so that I can more easily clean up the test
posts. This test will work the same without the sign in so if you do not add
the ENV vars it will skip this portion -- in this case I log the image URL to
the console for later clean up. I would prefer to automate the clean up but that
seemed mildly out of scope for the acceptance criteria.

Second, uploading files is always a fun time. The form on imgur for uploading
an image is implemented in a standard way. There is a hidden input that takes a
file path. If you were using this manually, you would select the 'Browse' button
and select your file, which would populate the input value with that file's path.
Or you would drag and drop a file into the droppable areas of the form. The most
robust way to deal with this in automation is to set the value of the input to
the file path of the image you want to upload. Unfortunately, it looks like
geckodriver / Firefox does not allow for interacting with this input so you will
find a hack where I execute JS in the browser that removes the class that is
setting the input to hidden. This allows the automation to set the file path to
the value of the input.

Once the file is uploaded, I wait for the publish button to appear -- this is a
pretty straightforward way of know the uploading is completed. I then expect the
title input to be present.

This test could be expanded to publish to the community or to visit the image /
album URL to confirm it is saved. Again, this seemed out of scope of the
acceptance criteria given.

### search

In the `search` test I use the commonly used `home_page` object to navigate. I
then scope to the `searchSection` for entering the search term. I used a search
term that results in a fairly narrow set of results in order to find the image
I am looking for easily. You'll notice I used the `browser.Keys.RETURN` to
submit the search form. This is due to the fact that no submit button is present
for that form.

I use the ID of that image to assert it is visible on the page as I expect that
is the least likely thing to change over time. Since the search navigates to a
separate page, I use the `results_page` object to house the elements of that
page.

### random mode

The `random_mode` test is probably one of the more fragile tests of the suite.
The acceptance criteria were fairly straight-forward -- select the random mode
button and expect the page returns without error. The selector I use in the
`random_page` object to confirm the page loaded is just a class on an element
on the page that is not present on the home page. If this selector is added to
the home page, the functionality tested could potentially break but the test
would continue to pass. Also, the selector on the expectation is a single class
scoped to nothing. If that class changes, this would produce a false positive
for a failing test.

This test could definitely be expanded in many ways but that would be out of
scope for the given acceptance criteria.

## Reaction

This was my first use of nightwatchjs. I have to say I am pretty impressed to
this point. Set up and configuration as well as using page objects was super
simple. Great first impression.
