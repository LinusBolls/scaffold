#!/usr/bin/env python3

# add .env.example
# env.ts handling

from subprocess import Popen, PIPE
from os import walk, path, getcwd, chdir
import argparse
from subprocess import Popen, PIPE

from pathlib import Path

import inquirer

from languages.index import languages
from merge_dirs.fill_slots import remove_slot_comments
from merge_dirs.index import merge_dirs

class Project():

  name = None
  path = None
  lang = None
  base = None
  modules = None
  is_with_repo = None

  def __init__(self):
    pass

TEMPLATE_PATH = path.join(Path(__file__).parent.resolve(), "../../templates")

def get_files(path):
  f = []

  for (dirpath, dirnames, filenames) in walk(path):
    f.extend(filenames)
    break

  return f

def get_dirs(path):
  f = []

  for (dirpath, dirnames, filenames) in walk(path):
      f.extend(dirnames)
      break
  
  return f

def get_dirs(path):
  f = []

  for (dirpath, dirnames, filenames) in walk(path):
      f.extend(dirnames)
      break
  
  return f

class Input():
  def __init__(self, name, option, desc):
    self.name = name
    self.option = option
    self.desc = desc

class Inputs():
  path = Input("path", "path", "the directory the project will be created in")
  lang = Input("lang", "--lang", "the language of the project")
  base = Input("base", "--base", "the scaffold the project is based on")
  modules = Input("modules", "--modules", "an arbitrary amount of modules making up the project")
  repo = Input("is_with_repo", "--is_with_repo", "whether or not to automatically create a github repo for the project")

class Project_Settings():
  def __init__(self, args):
    self.args = args

  def resolve_path(self):
    t_path = None
  
    if self.args.path != None:
      t_path = self.args.path
    else:
      t_path = inquirer.prompt([
        inquirer.Path(
          Inputs.path.name, 
          Inputs.path.desc, 
          path_type=inquirer.Path.DIRECTORY,
          exists=False
        )
      ])[Inputs.path.name]

    if path.exists(t_path):

      print(f"error: {t_path} already exists")
      exit(1)
    
    return t_path

  def resolve_lang(self):
    if self.args.lang != None:
      return self.args.lang
    
    return inquirer.prompt([
      inquirer.List(
        Inputs.lang.name,
        Inputs.lang.desc,
        choices=languages.keys()
      )
    ])[Inputs.lang.name]
  
  def resolve_base(self, project):
    if self.args.base != None:
      return self.args.base

    return inquirer.prompt([
      inquirer.List(
        Inputs.base.name,
        Inputs.base.desc,
        choices=get_dirs(path.join(TEMPLATE_PATH, project.lang.id, "bases")),
      )
    ])[Inputs.base.name]

  def resolve_modules(self, project):
    if self.args.modules != None:
      return self.args.modules

    return inquirer.prompt({
      inquirer.Checkbox(
        Inputs.modules.name,
        Inputs.modules.desc,
        choices=get_dirs(path.join(TEMPLATE_PATH, project.lang.id, "modules"))
      )
    })[Inputs.modules.name]

  def resolve_is_with_repo(self):
    if self.args.is_with_repo != None:
      print(self.args.is_with_repo)
    
      return True
  
    return inquirer.prompt({
        inquirer.Confirm(
          Inputs.repo.name,
          Inputs.repo.desc,
          default=False)
      })[Inputs.repo.name]

parser = argparse.ArgumentParser("arguments")

parser.add_argument(Inputs.path.option, help=Inputs.path.desc, type=str, nargs="?", default=None)
parser.add_argument(Inputs.lang.option, help=Inputs.lang.desc, type=str, nargs="?", default=None)
parser.add_argument(Inputs.base.option, help=Inputs.base.desc, type=str, nargs="?", default=None)
parser.add_argument(Inputs.modules.option, help=Inputs.modules.desc, type=str, nargs="*", default=None)
parser.add_argument(Inputs.repo.option, help=Inputs.repo.desc, type=bool, nargs="?", default=None)

def project_prompt():

  args = parser.parse_args()

  project = Project()

  settings = Project_Settings(args)

  project.path = settings.resolve_path()

  project.name = project.path

  lang_name = settings.resolve_lang()

  project.lang = languages[lang_name](project)

  project.base = settings.resolve_base(project)

  modules = settings.resolve_modules(project)

  project.modules = list(map(lambda i: path.join(TEMPLATE_PATH, project.lang.id, "modules", i), modules))

  components = [path.join(TEMPLATE_PATH, project.lang.id, "bases", project.base)] + project.modules

  merge_dirs(components, project.path, project.lang)

  chdir(project.path)

  dings = list(Path(getcwd()).rglob("*"))

  for file in dings:
      if not file.is_file():
        continue
    
      with open(file, "r+") as dist_file:
        old = dist_file.read()
        dist_file.seek(0)
        dist_file.write(remove_slot_comments(old))
        dist_file.truncate()
        
  project.lang.finish(project)

  # project.is_with_repo = settings.resolve_is_with_repo()

  # if project.is_with_repo:
  #   create_github_repo(project)

project_prompt()

def create_github_repo(project):

  cmds = [
    f"cd {project.path}",
    "git init",
    "git add .",
    "git commit -m 'initial commit'",
    f"gh repo create {project.name} --public --push"
  ]
  for cmd in cmds:

    repoOut, repoErr = Popen(cmd.split(), stdout=PIPE).communicate()

    if repoErr:
      print(f"error initializing githup repository {project.name}: {repoErr}")




