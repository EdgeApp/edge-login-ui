
package co.airbitz.core-js-ui;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class AbcCoreJsUiModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public AbcCoreJsUiModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "AbcCoreJsUi";
  }
}