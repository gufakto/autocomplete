# Autocomplete Library

Autocomplete with data local side and server side

## how to use

please add script in your html body like below:

```
<script src="./assets/js/autocomplete.js"></script>
```

Then create input element with attribute searchable and searchable-data.
you can add url or array data into searchable-data attribute like example

```
<input
    type="text"
    class="form-control"
    searchable
    searchable-data='["aku","kamu","dia","mereka", "Kita", "semua"]'
  />


<input
  type="text"
  class="form-control"
  searchable
  searchable-data="https://your-url.com/api"
/>
```

![Example of display gufakto autocomplete](https://github.com/gufakto/autocomplete/blob/master/assets/img/example.png)

## Author

-  sgufakto [sgufakto@gmail.com]
