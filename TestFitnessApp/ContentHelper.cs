using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace TestFitnessApp
{
    public class ContentHelper
    {
        public static StringContent GetStringContent(object obj)
            => new StringContent(JsonConvert.SerializeObject(obj), Encoding.Default, "application/json");
    }
}
