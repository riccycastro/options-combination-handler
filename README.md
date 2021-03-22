# options-combination-handler
### The Problem

In a UI where a user can combine several options in variants, the user may want to simplify the variations that have combinations that have all of one or more options.

Ex:

In a clothes store, you may have some t-shirt options that the user can combine to generate variations rows:

###### options
``` json
[
    {
        "id": "D",
        "name": "texture",
        "suboptions": [
            {
                "id": "d1",
                "name": "stamp"
            },
            {
                "id": "d2",
                "name": "stripes"
            },
            {
                "id": "d3",
                "name": "smooth"
            }
        ]
    },
    {
        "id": "A",
        "name": "color",
        "suboptions": [
            {
                "id": "a1",
                "name": "blue"
            },
            {
                "id": "a2",
                "name": "red"
            },
            {
                "id": "a3",
                "name": "green"
            }
        ]
    },
    {
        "id": "B",
        "name": "size",
        "suboptions": [
            {
                "id": "b1",
                "name": "xs"
            },
            {
                "id": "b2",
                "name": "s"
            },
            {
                "id": "b3",
                "name": "m"
            },
            {
                "id": "b4",
                "name": "l"
            },
            {
                "id": "b5",
                "name": "xl"
            }
        ]
    },
    {
        "id": "C",
        "name": "sleeve",
        "suboptions": [
            {
                "id": "c1",
                "name": "short"
            },
            {
                "id": "c2",
                "name": "long"
            },
            {
                "id": "c3",
                "name": "medium"
            }
        ]
    }
]
```

###### variations rows:

| texture | color | size | sleeve |
|---------|-------|------|--------|
| stamp   | blue  | m    | short  |
| stamp   | blue  | m    | long   |
| stamp   | blue  | m    | medium |

These combinations can be simplified to a single row

| texture | color | size | sleeve |
|---------|-------|------|--------|
| stamp   | blue  | m    | all    |

Because it has all the sleeve combinations, making it easier to read and to present to the end-user.
In the same way, if exists all possible combinations you may want to show the result like this:

| texture | color | size | sleeve |
|---------|-------|------|--------|
| all     | all   | all  | all    |

## Installation

The easiest way to install OptionsCombinationHandler is from [`npm`](https://www.npmjs.com/package/options-combination-handler):

```sh
npm i options-combination-handler
```

Alternately, you can download the source yourself:

```sh
git clone https://github.com/riccycastro/options-combination-handler.git
```

Then just import it where you need to use it

``` typescript
import {OptionHandler} from 'options-combination-handler'
OR
const {OptionHandler} = require("options-combination-handler");
```

## Interface
When importing, you are importing a class, so first off all you need to instantiate the class providing all the options and suboptions ids. From the example above would be like this:

``` typescript
const optionHandler = new OptionHandler({
    "D": ["d1", "d2", "d3"],
    "A": ["a1", "a2", "a3"],
    "B": ["b1", "b2", "b3", "b4", "b5"],
    "C": ["c1", "c2", "c3"]
})
```

### Generate all possible combinations
To generate all possible combinations from your options we can easily call the method *generateAllPossibleCombinations*

``` typescript
optionHandler.generateAllPossibleCombinations()
```
The output will be an array of combinations

``` json
[
    { "D": "d1", "A": "a1", "B": "b1", "C": "c1" },
    { "D": "d1", "A": "a1", "B": "b1", "C": "c2" },
    ...,
    ...,
    { "D": "d3", "A": "a3", "B": "b5", "C": "c3" }
]
```

### Convert combinations to rows

First of all what's a row? A row is an object where you can find a combination of variants that has one or more all or a single variation.

``` json
{
  "D": { // The option id
    "isAll": false,
    "keys": [ 
    // list of suboption ids
    // if is not an All this array will have a single value 
    // identifying which suboptions is selected
      "d1" 
    ]
  },
  "A": {
  // a flag that identify if this row item has all the A's 
  // suboptions 
    "isAll": true, 
    "keys": [
      "a1", "a2", "a3"
    ]
  },
  ...
}
```

So, this function receive an array of combinations and output an array of rows

``` typescript
optionHandler.convertCombinationsToRows([
    { "D": "d1", "A": "a1", "B": "b2", "C": "c2" },
    { "D": "d2", "A": "a1", "B": "b2", "C": "c1" },
    { "D": "d3", "A": "a1", "B": "b5", "C": "c2" },
    { "D": "d3", "A": "a1", "B": "b1", "C": "c1" },
    { "D": "d2", "A": "a1", "B": "b1", "C": "c1" },
    { "D": "d1", "A": "a1", "B": "b1", "C": "c1" },
    { "D": "d1", "A": "a1", "B": "b1", "C": "c2" },
    { "D": "d2", "A": "a1", "B": "b1", "C": "c2" },
    { "D": "d3", "A": "a1", "B": "b1", "C": "c2" }
  ])
```
The output

```json
[
    {
      "D": {
        "isAll": false,
        "keys": [
          "d1"
        ]
      },
      "A": {
        "isAll": false,
        "keys": [
          "a1"
        ]
      },
      "B": {
        "isAll": false,
        "keys": [
          "b2"
        ]
      },
      "C": {
        "isAll": false,
        "keys": [
          "c2"
        ]
      }
    },
    {
      "D": {
        "isAll": false,
        "keys": [
          "d2"
        ]
      },
      "A": {
        "isAll": false,
        "keys": [
          "a1"
        ]
      },
      "B": {
        "isAll": false,
        "keys": [
          "b2"
        ]
      },
      "C": {
        "isAll": false,
        "keys": [
          "c1"
        ]
      }
    },
    ....
```

### Convert rows to combinations
This is the opposite of the previous described function. It receives an array of rows and output an array of combinations, probably you'll need this to store the user variations

---

***Check tests for more examples.***

The present code is a quick solution to this problem, it may need improvements... 

If you found this useful, or you want to help I'm open to PRs

---

(The MIT License)

Copyright (c) 2021 Ricardo Castro <cruzcastro07@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
