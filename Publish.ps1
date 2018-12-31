. ".\lib.ps1"

$versionFile = '.\Webclient\src\index.html'
$webApp = 'Webclient'

$branch = git rev-parse --abbrev-ref HEAD
$revision = git rev-parse HEAD


Write-Output "`nSet version info in: $versionFile`n" 
(Get-Content $versionFile) `
  | Set-AttributeValue -attribute 'branch' -value $branch `
  | Set-AttributeValue -attribute 'rev' -value $revision `
  | Set-Content $versionFile

Write-Output "Build app`n----"
Execute-InSubfolder -location $webApp -action { 
  ng build --prod --aot 
}

Write-Output "----`nRevert source file: $versionFile`n"
git checkout -- WebClient/src/index.html

Write-Output "Ready"