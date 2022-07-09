from merge_dirs.merge_json_files import merge_json_files

class Language:

  def __init__(self, project):
    self.project = project

  def merge_files(self, contents, file_name):
    if file_name.endswith(".json"):
      return merge_json_files(contents, "merge")

    return "\n".join(contents)

  def finish(self, project):
    pass
