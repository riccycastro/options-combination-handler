# options-combinations-handler
###The Problem
In a UI where the user can combine several options in rows, the user may want to simplify the rows that have combinations that have all of one or more options.

Ex:

In a clothes store, you may have some t-shirt options that the user can combine to generate variations rows:

######options
``` json
[
    {
        "id": "D",
        "name": "texture"
    },
    {
        "id": "A",
        "name": "color"
    },
    {
        "id": "B",
        "name": "size"
    },
    {
        "id": "C",
        "name": "sleeve"
    }
]
```

######suboptions
```json
{
    "D": {"d1": "stamp", "d2": "stripes", "d3": "smooth"},
    "A": {"a1": "blue", "a2": "red", "a3": "green"},
    "B": {"b1": "xs", "b2": "s", "b3": "m", "b4": "l", "b5": "xl"},
    "C": {"c1": "short", "c2": "long", "c3": "medium"}
}
```
######variations rows:

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

check tests for more examples

(The MIT License)

Copyright (c) 2021 Ricardo Castro <cruzcastro07@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.