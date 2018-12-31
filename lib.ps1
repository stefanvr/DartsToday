Function Set-AttributeValue {
    [CmdletBinding()]
    Param(
     [Parameter(ValueFromPipeline)]
     [array]$content,
     $attribute,
     $value
  )
  process {
    $findAttribute = '(?<=' + $attribute + '=").*?(?=").'
    $replaceAttributeValue = $value + '"'
    $content | Foreach-Object { $_ -replace $findAttribute, $replaceAttributeValue }
  }
}


Function Execute-InSubfolder {
  Param(
    $location,
    $action
  )
  process {
    Push-Location 
    cd $location
    try
    {
      Invoke-Command -ScriptBlock $action
    }
    finally
    {
      Pop-Location
    }
  }
}