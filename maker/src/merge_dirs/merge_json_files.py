import json

def merge(source, destination):

    """
    run me with nosetests --with-doctest file.py

    >>> a = { 'first' : { 'all_rows' : { 'pass' : 'dog', 'number' : '1' } } }
    >>> b = { 'first' : { 'all_rows' : { 'fail' : 'cat', 'number' : '5' } } }
    >>> merge(b, a) == { 'first' : { 'all_rows' : { 'pass' : 'dog', 'fail' : 'cat', 'number' : '5' } } }
    True
    """
    for key, value in source.items():
        if isinstance(value, dict):
            # get node or create one
            node = destination.setdefault(key, {})
            merge(value, node)
        else:
            destination[key] = value

def uncompromising_json_loads(str):
  if isinstance(str, dict):
    return str
  try:
    return json.loads(str)
  except Exception as err:
    return {}

def merge_json_files(contents, behavior = "merge"):

  json_contents = list(map(uncompromising_json_loads, contents))

  result = {}

  if behavior == "merge":
    for json_content in json_contents:
      merge(json_content, result)

  if behavior == "overwrite":
    for json_content in json_contents:
      result = {**result, **json_content}

  return json.dumps(result, indent=2)