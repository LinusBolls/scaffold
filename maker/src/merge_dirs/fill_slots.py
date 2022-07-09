import re

get_slots = "/[*] <slot:([^ ]*)/> [*]/"

get_fills = "/[*] <fill:([^ ]*)> [*]/"

def select_slot(type):
  return f"/[*] <slot:{type}/> [*]/"

def select_fill(type):
  return f"/[*] <fill:{type}> [*]/([\s\S]*)/[*] </fill:{type}> [*]/"

def remove_slot_comments(slot_str):
  return re.sub(get_slots, "", slot_str)

def fill_slots(slot_str, fill_str, file_name):

  if slot_str == "":
    return fill_str

  fills = re.findall(get_fills, fill_str)

  for fill in fills:

    ding = re.search(select_fill(fill), fill_str)

    if ding == None:

      print(f"warning: failed to find closing tag for fill {fill} in file {file_name}")
  
      continue

    fill_and_tag = ding.group(1) + f"\n/* <slot:{fill}/> */"

    # fill slots with values
    slot_str = re.sub(select_slot(fill), fill_and_tag, slot_str)
 
  return slot_str


