
Pod::Spec.new do |s|
  s.name         = "AbcCoreJsUi"
  s.version      = "1.0.0"
  s.summary      = "AbcCoreJsUi"
  s.description  = <<-DESC
                  AbcCoreJsUi
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/AbcCoreJsUi.git", :tag => "master" }
  s.source_files  = "AbcCoreJsUi/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  