from os import path, walk, mkdir

def merge_dirs(dirs, dist, lang):

  mkdir(dist)
  
  for dir in dirs:

    for (dirpath, dirnames, filenames) in walk(dir):

      relative_path = "." + dirpath.replace(dir, "")

      for sub_file in filenames:

        open(path.join(dist, relative_path, sub_file), "a")

        with \
          open(path.join(dir, relative_path, sub_file)) as original_file, \
          open(path.join(dist, relative_path, sub_file), "r+") as dist_file \
        :
          merged_content = lang.merge_files([dist_file.read(), original_file.read()], sub_file)

          dist_file.seek(0)
          dist_file.write(merged_content)
          dist_file.truncate()
      
      for sub_dir in dirnames:

        full_path = path.join(dist, relative_path, sub_dir)

        if not path.exists(full_path):
          mkdir(full_path)